from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "compus_life.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import compus_life.users.signals  # noqa: F401
        except ImportError:
            pass
