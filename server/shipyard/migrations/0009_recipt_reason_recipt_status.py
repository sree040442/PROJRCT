

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0008_shipment_delivery_boy_assigned'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='reason',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='recipt',
            name='status',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
