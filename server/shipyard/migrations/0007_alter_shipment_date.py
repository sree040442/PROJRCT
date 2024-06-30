

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0006_alter_shipment_estimated_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipment',
            name='date',
            field=models.DateTimeField(null=True),
        ),
    ]
