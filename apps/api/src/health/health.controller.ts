import { Controller, Get } from '@nestjs/common';
@Controller('health')
export class HealthController {
  @Get() check() { return { status: 'ok', service: 'el-paraiso-gonzalo-api', liveFinancialOperations: false, timestamp: new Date().toISOString() }; }
}
