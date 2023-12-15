import { createLogger, format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

export const initializeLogger = () => {
  const winstonLogger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
  });

  return WinstonModule.createLogger({
    transports: [winstonLogger],
  });
};
