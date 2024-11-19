package com.elasticsearch.muralihomeoelasticsearch.configs;

import java.io.File;

import javax.net.ssl.SSLContext;

import org.apache.http.auth.AuthScope;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClientBuilder.HttpClientConfigCallback;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchClients.ElasticsearchHttpClientConfigurationCallback;
import org.springframework.stereotype.Component;


@Configuration
public class HttpClientConfigImpl implements HttpClientConfigCallback{

	@Override
	public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
		// TODO Auto-generated method stub
		try {
			final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
			UsernamePasswordCredentials usernamePasswordCredentials = new UsernamePasswordCredentials("elastic",
					"password");
			credentialsProvider.setCredentials(AuthScope.ANY, usernamePasswordCredentials);
			httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);

			String trustLocationStore = "C:\\Users\\yaswa\\Downloads\\elasticsearch-8.15.3-windows-x86_64\\elasticsearch-8.15.3\\config\\certs\\truststore.p12";
			File trustLocationFile = new File(trustLocationStore);

			SSLContextBuilder sslContextBuilder = SSLContexts.custom().loadTrustMaterial(trustLocationFile,
					"password".toCharArray());
			SSLContext sslContext = sslContextBuilder.build();
			httpClientBuilder.setSSLContext(sslContext);

		} catch (Exception e) {
			System.out.println("\n\n\nException occured : \n\n\n");
			System.out.println(e.getMessage());
			
		}
		return httpClientBuilder;
	}

}
