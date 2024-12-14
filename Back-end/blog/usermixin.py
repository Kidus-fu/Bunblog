class UserFilterMixin():
    userFiled = "user"
    def get_queryset(self, *args, **kwargs):
        lookup_data = {}
        lookup_data[self.userFiled] = self.request.user
        qs = super().get_queryset(*args, **kwargs)
        return qs.filter(**lookup_data)
class UserFilterMixinOut:
    userField = "user"
    is_public = "public"

    def get_queryset(self, *args, **kwargs):
        # Get the current user
        current_user = self.request.user
        
        # Get the queryset from the parent class
        qs = super().get_queryset(*args, **kwargs)
        
        # Filter posts: exclude those by the current user and ensure only public posts
        qs = qs.exclude(**{self.userField: current_user}).filter(**{self.is_public:True})
        
        return qs
class UserprofileMicin:
    is_public = "public"
    userField = "user"
    def get_quertset(self,*args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        current_user = self.request.user
        qs = qs.exclude(**{self.userField: current_user}).filter(**{self.is_public:True})

        return qs

