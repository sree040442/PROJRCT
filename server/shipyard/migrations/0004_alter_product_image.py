

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0003_merge_20230218_1047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, upload_to='static/images/'),
        ),
    ]
