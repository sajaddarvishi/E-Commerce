# Generated by Django 5.1 on 2024-10-01 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.CharField(default='Unknown', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(default='Unknown', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='countInStock',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(default='Unknown', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0 , max_digits=11),
            preserve_default=False,
        ),
    ]
