from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["first_name","last_name","email","username","password","password2"]


    # field level validation : check unique email
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use.")
        return value

    # object-level validation: compare password and password2
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password didn't match.")
        return data


    # create user with hashed password
    def create(self, validated_data):
        validated_data.pop('password2')

        user = User(
           username = validated_data['username'] ,
           email = validated_data['email'],
           first_name = validated_data['first_name'],
           last_name = validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user
        


# login serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # custom reponse data
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['admin'] = self.user.is_staff

        return data
    
    