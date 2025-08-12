import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Middleware global para headers anti-cache (específico para Vercel)
  app.use((req, res, next) => {
    // Solo aplicar a rutas de API
    if (req.url.startsWith('/api') || req.url.startsWith('/client') || req.url.startsWith('/appointment') || req.url.startsWith('/room')) {
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate, private',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Vercel-CDN-Cache-Control': 'no-cache',
        'CDN-Cache-Control': 'no-cache',
        'X-Vercel-Cache': 'MISS',
      });
    }
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('SPA System API')
    .setDescription('Documentación de la API para el sistema de SPA')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
