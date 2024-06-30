

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0012_recipt_delivery_boy_review'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='exchange_refund_status',
            field=models.CharField(default='Pending', max_length=100),
        ),
    ]
