from django.db import migrations


def _dash(text: str) -> str:
    return (text or "").replace("—", "-")


def forwards(apps, schema_editor):
    for model_name in ("Tour", "FAQItem", "Testimonial"):
        Model = apps.get_model("core", model_name)
        for obj in Model.objects.all():
            changed = False
            for field in obj._meta.fields:
                if field.get_internal_type() not in ("CharField", "TextField"):
                    continue
                val = getattr(obj, field.name)
                if isinstance(val, str) and "—" in val:
                    setattr(obj, field.name, _dash(val))
                    changed = True
            if changed:
                obj.save()


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0008_vk_bot_fields"),
    ]

    operations = [
        migrations.RunPython(forwards, migrations.RunPython.noop),
    ]
