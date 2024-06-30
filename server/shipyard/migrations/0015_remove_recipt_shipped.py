

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0014_recipt_shipped'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipt',
            name='shipped',
        ),
    ]
