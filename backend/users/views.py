from django.db.models import Q
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import StudentProfile, TeacherProfile, User
from .permissions import IsAdmin, IsAdminOrReadOnly, is_admin, is_student, is_teacher
from .serializers import (
    RegisterSerializer,
    StudentProfileSerializer,
    TeacherProfileSerializer,
    TokenPairSerializer,
    UserSerializer,
)


class TokenPairView(TokenObtainPairView):
    serializer_class = TokenPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user, context={"request": request}).data, status=201)


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    queryset = User.objects.select_related("student_profile", "teacher_profile").order_by("-created_at")
    search_fields = ["username", "email", "first_name", "last_name", "phone"]
    ordering_fields = ["created_at", "role", "first_name"]


class StudentProfileViewSet(viewsets.ModelViewSet):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["user__first_name", "user__last_name", "admission_number", "roll_number"]
    ordering_fields = ["created_at", "roll_number", "admission_number"]

    def get_queryset(self):
        qs = StudentProfile.objects.select_related("user", "classroom", "classroom__class_teacher")
        user = self.request.user
        if is_admin(user):
            return qs
        if is_teacher(user) and hasattr(user, "teacher_profile"):
            return qs.filter(
                Q(classroom__class_teacher=user.teacher_profile)
                | Q(classroom__subjects__teacher=user.teacher_profile)
            ).distinct()
        if is_student(user):
            return qs.filter(user=user)
        return qs.none()


class TeacherProfileViewSet(viewsets.ModelViewSet):
    serializer_class = TeacherProfileSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["user__first_name", "user__last_name", "employee_id", "designation"]
    ordering_fields = ["created_at", "employee_id"]

    def get_queryset(self):
        qs = TeacherProfile.objects.select_related("user")
        user = self.request.user
        if is_admin(user) or is_student(user):
            return qs
        if is_teacher(user):
            return qs.filter(user=user)
        return qs.none()
