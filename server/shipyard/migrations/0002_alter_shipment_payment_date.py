

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipment',
            name='payment_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
