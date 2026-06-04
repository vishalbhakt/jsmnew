from django.db.models import Q
from rest_framework import viewsets

from users.permissions import IsAdminOrTeacherWrite, is_admin, is_student, is_teacher

from .models import AttendanceRecord, AttendanceSession
from .serializers import AttendanceRecordSerializer, AttendanceSessionSerializer


class AttendanceSessionViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSessionSerializer
    permission_classes = [IsAdminOrTeacherWrite]
    search_fields = ["classroom__name", "subject__name", "date"]
    ordering_fields = ["date", "created_at"]

    def get_queryset(self):
        qs = AttendanceSession.objects.select_related(
            "classroom",
            "subject",
            "taken_by",
            "taken_by__user",
        ).prefetch_related("records")
        user = self.request.user
        if is_admin(user):
            return qs
        if is_teacher(user) and hasattr(user, "teacher_profile"):
            return qs.filter(
                Q(taken_by=user.teacher_profile)
                | Q(classroom__class_teacher=user.teacher_profile)
                | Q(subject__teacher=user.teacher_profile)
            ).distinct()
        if is_student(user) and hasattr(user, "student_profile"):
            return qs.filter(classroom=user.student_profile.classroom)
        return qs.none()

    def perform_create(self, serializer):
        teacher = getattr(self.request.user, "teacher_profile", None)
        serializer.save(taken_by=teacher or serializer.validated_data.get("taken_by"))


class AttendanceRecordViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceRecordSerializer
    permission_classes = [IsAdminOrTeacherWrite]
    search_fields = ["student__user__first_name", "student__user__last_name", "status"]
    ordering_fields = ["created_at", "status"]

    def get_queryset(self):
        qs = AttendanceRecord.objects.select_related(
            "session",
            "session__classroom",
            "session__subject",
            "student",
            "student__user",
        )
        user = self.request.user
        if is_admin(user):
            return qs
        if is_teacher(user) and hasattr(user, "teacher_profile"):
            return qs.filter(
                Q(session__taken_by=user.teacher_profile)
                | Q(session__classroom__class_teacher=user.teacher_profile)
                | Q(session__subject__teacher=user.teacher_profile)
            ).distinct()
        if is_student(user):
            return qs.filter(student__user=user)
        return qs.none()
