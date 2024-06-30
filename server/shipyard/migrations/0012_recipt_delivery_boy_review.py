

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0011_recipt_return_products'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='delivery_boy_review',
            field=models.TextField(blank=True),
        ),
    ]
