# node 이미지를 받는다 build이미지이구나 
# node 기반의 이미지로 생성된다. 
FROM node:latest as build-stage 

# RUN, CMD, ENTRYPOINT의 명령이 실행될 디렉터리 
WORKDIR /app 

# 로컬 proxy path 설정
ENV REACT_APP_API_URL http://back
ENV REACT_APP_SEPOLIA_API_URL=https://sepolia.infura.io/v3/a4636fca95804d9ab953276a4ea93748
ENV REACT_APP_SEPOLIA_ADMIN_PUBLIC_KEY=0xCf779DB49Fc0CA0Ef3ba47E12Cf0b25b195879c5
ENV REACT_APP_SEPOLIA_ADMIN_PRIVATE_KEY=b0148045d850bc0d896cf9b99603fcfdde940b61daf07d5c93c20cf675ac575f
ENV REACT_APP_SEPOLIA_TOKEN_CONTRACT=0x735A38151F906EB5E7873491E57c447b3ca9Ac49a

# package*.json이 WORKDIR에 복사된다 
COPY package*.json ./ 

# 복사했으니 디펜던시 설치가 가능하다 
RUN npm install 

# 소스코드를 복사한다 
COPY ./ . 

# ENV NODE_OPTIONS=--max_old_space_size=2048

# build 해서 /dist 폴더에 빌드 파일이 생성된다. 
RUN npm run build

# 3000번 포트 노출
EXPOSE 80

# npm start 스크립트 실행
# CMD ["npm", "start"]
# CMD ["nginx", "-g", "daemon off;"]

# nginx 이미지를 받는다. 실행 이미지이구나 
FROM nginx:1.23.4-alpine

COPY ./conf /etc/nginx/

# builder에서 빌드한 바이너리를 실행할 이미지로 전달해주기 위해 copy --from 옵션을 사용하여 실행 이미지로 전달한다 
COPY --from=build-stage /app/build /usr/share/nginx/html