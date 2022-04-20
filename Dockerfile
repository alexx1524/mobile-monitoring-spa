FROM nginx:1.15.8

EXPOSE 80

COPY conf/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY dist/infotecs.mobile.monitoring.spa /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.production.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
