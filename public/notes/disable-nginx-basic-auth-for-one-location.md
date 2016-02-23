If you protected your website with nginx `basic_auth`, and want to disable it for just one (_or maybe some specific locations_), you can use `basic_auth off` for that location and the authorization won't be required.

Example:

```bash
server {
  auth_basic "Restricted content";
  auth_basic_user_file /etc/nginx/.htpasswd;

  location /public/ {
    auth_basic off;
  }
}
```