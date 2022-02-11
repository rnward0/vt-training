async updateFaqTopic(inputFaqTopic: InputFAQTopic) {
    if (!inputFaqTopic.id) {
        throw new NotFoundException("FAQ ID required for update");
    }
    return pipe(
        await this.faqsTopicsRepository.findOne({
            where: { id: inputFaqTopic.id },
        }),
        (original) => {
            original?.update({
                ...inputFaqTopic,
                name: inputFaqTopic.name,
                slug: this.faqSlug(inputFaqTopic.name),
                buyerSide: inputFaqTopic.buyerSide,
                title: inputFaqTopic.title,
                description: inputFaqTopic.description,
                keywords: inputFaqTopic.keywords,
            });
        }
    );
}