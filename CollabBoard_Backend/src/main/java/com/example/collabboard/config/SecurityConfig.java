package com.example.collabboard.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.reactive.CorsConfigurationSource;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${google.jwk.uri}")
    private String jwkUri;
    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http,
                                                         CorsConfigurationSource corsConfigurationSource) {
        http
                .cors(corsSpec -> corsSpec.configurationSource(corsConfigurationSource))
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .httpBasic(ServerHttpSecurity.HttpBasicSpec::disable)
                .formLogin(ServerHttpSecurity.FormLoginSpec::disable)
                .oauth2ResourceServer(
                        o -> o.jwt(jwtSpec -> jwtSpec.jwkSetUri(jwkUri))
                )
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers(HttpMethod.POST, "/api/v1/users/{userId}/boards/{boardId}/items").authenticated()
//                        .pathMatchers("/api/v1/users/**").permitAll()
                        .pathMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/v1/items/**").permitAll()
                        .anyExchange().authenticated());
        return http.build();
    }
}
