from django.urls import path
from .views import (
    UserRegister,
    UserLogin,
    UserLogout,
    UserView,
    AdminDashboardView,
    EventListView,
    JoinEventView,
    LeaveEventView,
)

urlpatterns = [
    # User authentication
    path("register/", UserRegister.as_view(), name="api-register"),
    path("login/", UserLogin.as_view(), name="api-login"),
    path("logout/", UserLogout.as_view(), name="api-logout"),
    # User management
    path("users/", UserView.as_view(), name="api-users"),
    path("users/<int:pk>/", UserView.as_view(), name="api-user-detail"),
    # Admin Dashboard
    path("admin-dashboard/", AdminDashboardView.as_view(), name="api-admin-dashboard"),
    # Events
    path("events/", EventListView.as_view(), name="api-events"),
    path("events/<int:event_id>/", EventListView.as_view(), name="api-event-detail"),
    # Event participation
    path("events/<int:pk>/join/", JoinEventView.as_view(), name="api-join-event"),
    path("events/<int:pk>/leave/", LeaveEventView.as_view(), name="api-leave-event"),
]
