# Generated by Django 4.0.4 on 2023-11-13 19:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0003_experience'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experience',
            name='semester_photo1',
            field=models.ImageField(null=True, upload_to='anual_semester_photo'),
        ),
        migrations.AlterField(
            model_name='experience',
            name='semester_photo2',
            field=models.ImageField(null=True, upload_to='anual_semester_photo'),
        ),
        migrations.AlterField(
            model_name='student',
            name='course',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='student.course'),
        ),
        migrations.AlterField(
            model_name='student',
            name='current_level',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='student',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AlterField(
            model_name='student',
            name='first_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='student',
            name='last_name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='student',
            name='reg_number',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='student',
            name='surname',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]