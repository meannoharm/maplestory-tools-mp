export const getCharacterInfo = (userName, region = 'gms') => {
	return uni.request({
		url: `https://api.maplestory.gg/v2/public/character/${region}/${userName}`
	})
}

export const getAutoCompleteList = (input, region = 'gms') => {
	return uni.request({
		url: `https://api.maplestory.gg/v1/public/autocomplete/${input}/${region}`
	})
}