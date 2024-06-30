

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Shipment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True)),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Pending", "Pending"),
                            ("In Progress", "In Progress"),
                            ("Completed", "Completed"),
                        ],
                        default="Pending",
                        max_length=100,
                    ),
                ),
                (
                    "condition",
                    models.CharField(
                        choices=[("Good", "Good"), ("Damaged", "Damaged")],
                        default="Good",
                        max_length=100,
                    ),
                ),
                ("current_location", models.CharField(default="", max_length=100)),
                ("from_location", models.CharField(default="", max_length=100)),
                ("to_location", models.CharField(default="", max_length=100)),
                ("payment_done", models.BooleanField(default=False)),
                ("payment_amount", models.IntegerField(default=0)),
                ("payment_date", models.DateTimeField(null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
