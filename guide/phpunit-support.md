# PHPUnit Support

Parity can verify PHPUnit coverage links through attributes.

```php
use PHPUnit\Framework\Attributes\CoversClass;

#[CoversClass(App\Services\InvoiceService::class)]
final class InvoiceServiceTest extends TestCase
{
}
```

Generate detailed coverage with:

```bash
vendor/bin/phpunit --coverage-xml coverage-xml
```
