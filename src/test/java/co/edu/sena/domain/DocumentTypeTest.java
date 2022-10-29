package co.edu.sena.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DocumentTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentType.class);
        DocumentType documentType1 = new DocumentType();
        documentType1.setId(1L);
        DocumentType documentType2 = new DocumentType();
        documentType2.setId(documentType1.getId());
        assertThat(documentType1).isEqualTo(documentType2);
        documentType2.setId(2L);
        assertThat(documentType1).isNotEqualTo(documentType2);
        documentType1.setId(null);
        assertThat(documentType1).isNotEqualTo(documentType2);
    }
}
