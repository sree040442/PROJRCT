

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("shipyard", "0004_alter_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="recipt",
            name="products",
            field=models.ManyToManyField(to="shipyard.product"),
        ),
        migrations.AddField(
            model_name="recipt",
            name="shipment",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="shipyard.shipment",
            ),
        ),
        migrations.AddField(
            model_name="shipment",
            name="estimated_date",
            field=models.DateField(null=True),
        ),
    ]
