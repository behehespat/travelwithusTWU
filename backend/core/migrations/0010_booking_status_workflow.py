from django.db import migrations, models


def migrate_statuses(apps, schema_editor):
    TourBooking = apps.get_model("core", "TourBooking")
    mapping = {
        "pending": "new",
        "confirmed": "in_progress",
        "cancelled": "reviewed",
    }
    for old, new in mapping.items():
        TourBooking.objects.filter(status=old).update(status=new)


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0009_replace_em_dash_in_content"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tourbooking",
            name="status",
            field=models.CharField(
                choices=[
                    ("new", "Новая"),
                    ("in_progress", "В процессе"),
                    ("reviewed", "Рассмотрена"),
                ],
                default="new",
                max_length=16,
            ),
        ),
        migrations.RunPython(migrate_statuses, migrations.RunPython.noop),
    ]
