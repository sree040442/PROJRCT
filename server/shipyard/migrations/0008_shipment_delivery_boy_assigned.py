

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0007_alter_shipment_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='shipment',
            name='delivery_boy_assigned',
            field=models.IntegerField(default=0),
        ),
    ]
