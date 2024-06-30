

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shipyard', '0005_recipt_products_recipt_shipment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipment',
            name='estimated_date',
            field=models.DateTimeField(null=True),
        ),
    ]
