

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0009_recipt_reason_recipt_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='return_status',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
