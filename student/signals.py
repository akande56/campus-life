from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime, timedelta
from student.models import Session, Semester, University

@receiver(post_save, sender=Session)
def create_semesters(sender, instance, created, **kwargs):
    if created:
        current_date = datetime.now().date()
        uni = University.objects.first()
        
        # Create first semester
        first_semester = Semester.objects.create(
            title="First Semester",
            current_semester=True,
            start_date=current_date,
            end_date=current_date + timedelta(days=180),  # Adjust the duration as needed
            session=instance,
            university=uni,
        )

        # Create second semester
        second_semester = Semester.objects.create(
            title="Second Semester",
            current_semester=False,
            start_date=current_date + timedelta(days=181),  # Start second semester the day after the first semester ends
            end_date=current_date + timedelta(days=365),  # Adjust the duration as needed
            session=instance,
            university=uni,
        )

        # deactivate current active semester
        Semester.objects.all().exclude(id=first_semester.id).update(current_semester=False)

        # Set active_session to True for the newly created session
        Session.objects.all().exclude(id=instance.id).update(active_session=False)
        instance.active_session = True
        instance.save()
