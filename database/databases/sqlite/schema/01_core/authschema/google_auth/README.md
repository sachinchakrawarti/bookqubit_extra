    
## OAuth Scopes

| Scope | Description |
|-------|-------------|
| email | User's email address |
| profile | User's basic profile info |
| openid | OpenID Connect |

## Security Considerations

1. **Tokens are encrypted** in database
2. **Refresh tokens** stored securely
3. **Token expiration** enforced
4. **Scope validation** on every request
5. **Rate limiting** on OAuth endpoints
6. **CSRF protection** on OAuth flow

## Related Tables

- `users` - Main user accounts
- `sessions` - User sessions
- `auth_tokens` - JWT tokens
- `security_logs` - Security audit