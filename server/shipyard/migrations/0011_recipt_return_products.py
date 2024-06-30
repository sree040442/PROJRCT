

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0010_recipt_return_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipt',
            name='return_products',
            field=models.JSONField(null=True),
        ),
    ]
