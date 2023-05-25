export const getCharacterInfo = (userName: string) => {
	return uni.request({
		url: `https://api.maplestory.gg/v2/public/character/gms/${userName}`
	})
}

export const getAutoCompleteList = (input: string) => {
	return uni.request({
		url: `https://api.maplestory.gg/v1/public/autocomplete/${input}/gms`
	})
}
