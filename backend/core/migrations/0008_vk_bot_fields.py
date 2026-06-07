from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0007_local_tour_image_urls"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="vk_first_name",
            field=models.CharField(blank=True, default="", max_length=120),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="vk_last_name",
            field=models.CharField(blank=True, default="", max_length=120),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="vk_user_id",
            field=models.BigIntegerField(blank=True, db_index=True, null=True, verbose_name="VK user id"),
        ),
        migrations.AddField(
            model_name="tourbooking",
            name="vk_notified_at",
            field=models.DateTimeField(blank=True, null=True, verbose_name="VK: отправлено"),
        ),
        migrations.AddField(
            model_name="tourbooking",
            name="vk_notify_error",
            field=models.TextField(blank=True, default="", verbose_name="VK: ошибка"),
        ),
    ]
