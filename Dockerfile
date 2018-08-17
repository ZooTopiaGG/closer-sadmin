FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

COPY ./*.conf /etc/nginx/conf.d/

RUN mkdir /apps/closer-super-admin
COPY ./dist/ /apps/closer-super-admin/
WORKDIR /apps/closer-super-admin

EXPOSE 4444
