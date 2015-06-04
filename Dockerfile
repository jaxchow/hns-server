#hns server docker form centos
FROM centos 
MAINTAINER jaxchow <jaxchow@gmail.com>

RUN echo "yum install git"
RUN yum -y install git

#EXPOSE 8888
RUN yum -y install gcc gcc-c++ openssl-devel wget tar make
RUN wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
RUN tar zxvf node-v0.10.24.tar.gz && cd node-v0.10.24
RUN ./configure --prefix=/usr/local/node
RUN make && make install
RUN node -v && npm -v
