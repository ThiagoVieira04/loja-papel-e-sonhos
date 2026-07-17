import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleStrategy {
  private client: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    this.client = new OAuth2Client(clientId);
  }

  async verifyToken(credential: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Token Google inválido');
      }

      return {
        googleId: payload.sub,
        email: payload.email!,
        name: payload.name || '',
        avatar: payload.picture || '',
        emailVerified: payload.email_verified || false,
      };
    } catch (error) {
      throw new UnauthorizedException('Token Google inválido ou expirado');
    }
  }
}
