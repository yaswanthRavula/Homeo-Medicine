package com.elasticsearch.muralihomeoelasticsearch.configs;

import java.util.function.Supplier;

import com.elasticsearch.muralihomeoelasticsearch.Model.Patient;

import co.elastic.clients.elasticsearch._types.query_dsl.FuzzyQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import lombok.experimental.var;

public class ElasticSearchUtil {

	public static Supplier<Query> createQuerySupplier(String approxName){
		Supplier<Query> supplier = ()-> Query.of(q-> q.fuzzy(createFuzzyQuery(approxName)));
		return supplier;
	}
	public static FuzzyQuery createFuzzyQuery(String approxName) {
		var fuzzyQuery = new FuzzyQuery.Builder();
		return fuzzyQuery.field("firstname").value(approxName).build();
		
	}
}
