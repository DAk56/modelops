window.onload = () => {
  const ui = SwaggerUIBundle({
    url: "swagger.json",
    dom_id: '#swagger-ui',
    requestInterceptor: (req) => {
      req.url = decodeURIComponent(req.url); // disables encoding
      return req;
    },
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    layout: "StandaloneLayout"
  });
};
