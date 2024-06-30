

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0013_recipt_exchange_refund_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='shipped',
            field=models.BooleanField(default=False),
        ),
    ]
