package com.usa.computerapp.seguridad;


import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityAdapter extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(a -> a.antMatchers("/", "/error", "/webjars/**","/Reservation/**",
                        "/Client/**", "/Computer/**", "/Category/**", "/Admin/**", "/Message/**", "/Score/**" ).permitAll()
                .anyRequest().authenticated()).exceptionHandling(e ->e
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))).oauth2Login();

        http.cors().and().csrf().disable();
    }
}
