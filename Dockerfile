FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

COPY ./*.conf /etc/nginx/conf.d/

RUN mkdir /apps/closer-super-admin-new
COPY ./dist/ /apps/closer-super-admin-new/
WORKDIR /apps/closer-super-admin-new

EXPOSE 5555
