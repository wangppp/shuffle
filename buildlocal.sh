rm -rf api/public/
# 先构建静态文件
cd frontend && yarn build && cd .. && cp -rf frontend/build/ api/public