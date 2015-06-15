#hns server docker form centos
FROM centos
MAINTAINER jaxchow <jaxchow@gmail.com>

RUN echo "yum install wget tar xz"
RUN yum -y install wget tar xz

EXPOSE 3000
WORKDIR /opt/
RUN wget https://iojs.org/dist/v2.2.1/iojs-v2.2.1-linux-x64.tar.xz
RUN xz -d iojs-v2.2.1-linux-x64.tar.xz
RUN tar xvf iojs-v2.2.1-linux-x64.tar
RUN mv iojs-v2.2.1-linux-x64 iojs
RUN cd /usr/local/bin && ln -s /opt/iojs/bin/* .
RUN node -v && npm -v
