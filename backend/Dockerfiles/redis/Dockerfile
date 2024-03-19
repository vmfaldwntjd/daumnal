FROM redis:latest
EXPOSE 3370
COPY conf/redis.conf /usr/local/etc/redis/redis.conf
ENTRYPOINT ["redis-server", "/usr/local/etc/redis/redis.conf"]