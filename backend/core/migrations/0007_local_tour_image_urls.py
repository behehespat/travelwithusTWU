from django.db import migrations

LOCAL_TOUR_IMAGES = {
    "shanghai-suzhou": "/main-slider/2db74eac499e5f20e615a2ad1217eb40.jpg",
    "shanghai-avatar": "/main-slider/93fd31c5b9ccc8aa8c96233ff208fd72.jpg",
    "great-china": "/main-slider/f839bd446b760fab027bb93bc414b6d8.jpg",
    "contrasts": "/main-slider/59cb1804b8c18b58bd2171fcc1e96a26.jpg",
}


def forwards(apps, schema_editor):
    Tour = apps.get_model("core", "Tour")
    for slug, url in LOCAL_TOUR_IMAGES.items():
        Tour.objects.filter(slug=slug).update(image_url=url)


def backwards(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0006_userprofile_phone_vk_url"),
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
    ]
