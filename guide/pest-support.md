# Pest Support

Parity can verify Pest coverage links when a test uses `->covers()`.

```php
it('creates invoices', function () {
    // test body
})->covers(App\Services\InvoiceService::class);
```

Use PHPUnit XML coverage when you also want matched coverage and per-test attribution.
