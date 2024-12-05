FROM grafana/k6:latest

COPY test.js /test.js

ENTRYPOINT ["k6", "run", "/test.js"]

#run k6
# 1. eliminar imagen [k6-start-script]
# 2. crear imagen
# docker build -t k6-start-script .
# 3. ejecutar script
# docker run --rm -e AUTH_TOKEN="" k6-start-script
